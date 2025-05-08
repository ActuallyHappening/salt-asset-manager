use std::ops::Deref;

use camino::Utf8PathBuf;
use clap::Parser as _;
use swc_common::sync::Lrc;
use swc_common::{
    FileName, FilePathMapping, SourceMap,
    errors::{ColorConfig, Handler},
};
use swc_ecma_ast::{Import, ImportDecl};
use swc_ecma_parser::{Parser, StringInput, Syntax, lexer::Lexer};
use swc_ecma_visit::{VisitMut, VisitMutWith};
use tracing::{debug, info, trace};

#[derive(clap::Parser, Debug)]
#[command(version, about, long_about = None)]
struct Args {
    file: Utf8PathBuf,
}
fn main() {
    use tracing_subscriber::prelude::*;
    use tracing_subscriber::{EnvFilter, fmt};

    let fmt_layer = fmt::layer().with_target(false);
    let filter_layer = EnvFilter::try_from_default_env()
        .or_else(|_| EnvFilter::try_new("info,vendor=trace"))
        .unwrap();

    tracing_subscriber::registry()
        .with(filter_layer)
        .with(fmt_layer)
        .init();
    trace!("Tracing init");

    let args = Args::parse();

    process_js_file(args.file);
}

fn process_js_file(file: Utf8PathBuf) {
    let cm: Lrc<SourceMap> = Default::default();
    let handler = Handler::with_tty_emitter(ColorConfig::Auto, true, false, Some(cm.clone()));

    // Real usage
    let fm = cm
        .load_file(&file.clone().into_std_path_buf())
        .expect("failed to load test.js");
    // let fm = cm.new_source_file(
    //     FileName::Custom(args.file.into()).into(),
    //     "function foo() {}".into(),
    // );
    let lexer = Lexer::new(
        // We want to parse ecmascript
        Syntax::Es(Default::default()),
        // EsVersion defaults to es5
        Default::default(),
        StringInput::from(&*fm),
        None,
    );

    let mut parser = Parser::new_from(lexer);

    for e in parser.take_errors() {
        e.into_diagnostic(&handler).emit();
    }

    let mut module = parser
        .parse_module()
        .map_err(|mut e| {
            // Unrecoverable fatal error occurred
            e.into_diagnostic(&handler).emit()
        })
        .expect("failed to parser module");

    debug!(?module);

    struct Process {
        file_path: Utf8PathBuf,
    }
    let mut process = Process { file_path: file };
    let file_dir = {
        let mut file_path = process.file_path.clone();
        file_path.pop();
        file_path
    };
    std::env::set_current_dir(file_dir).unwrap();

    impl swc_ecma_visit::VisitMut for Process {
        fn visit_mut_import_decl(&mut self, node: &mut ImportDecl) {
            trace!(?node);
        }

        fn visit_mut_import(&mut self, node: &mut Import) {
            trace!(?node);
        }

        fn visit_mut_import_default_specifier(
            &mut self,
            node: &mut swc_ecma_ast::ImportDefaultSpecifier,
        ) {
            trace!(?node);
        }

        fn visit_mut_named_export(&mut self, node: &mut swc_ecma_ast::NamedExport) {
            trace!(?node);
            if let Some(src) = &mut node.src {
                let orig: String = src.deref().deref().value.as_str().to_owned();
                let new;
                if Utf8PathBuf::from(format!("{orig}.js")).is_file() {
                    new = format!("{}.js", orig);
                } else if Utf8PathBuf::from(orig.clone()).is_dir() {
                		let indexjs = format!("{}/index.js", orig);
                    if !Utf8PathBuf::from(indexjs.clone()).is_file() {
                        panic!("No index.js file found at {} dir path", indexjs);
                    }
                    new = indexjs;
                } else {
                    panic!(
                        "Path {} doesn't exist relative to module at path {}",
                        orig, self.file_path
                    );
                }

                info!(%orig, %new);
            }
        }
    }

    module.visit_mut_children_with(&mut process);
}
