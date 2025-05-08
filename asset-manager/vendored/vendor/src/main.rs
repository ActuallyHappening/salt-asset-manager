use camino::Utf8PathBuf;
use clap::Parser as _;
use swc_common::sync::Lrc;
use swc_common::{
    FileName, FilePathMapping, SourceMap,
    errors::{ColorConfig, Handler},
};
use swc_ecma_parser::{Parser, StringInput, Syntax, lexer::Lexer};

#[derive(clap::Parser, Debug)]
#[command(version, about, long_about = None)]
struct Args {
    file: Utf8PathBuf,
}
fn main() {
    let args = Args::parse();
}

fn process_js_file(file: Utf8PathBuf) {
    let cm: Lrc<SourceMap> = Default::default();
    let handler = Handler::with_tty_emitter(ColorConfig::Auto, true, false, Some(cm.clone()));

    // Real usage
    let fm = cm
        .load_file(&file.into_std_path_buf())
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

    let _module = parser
        .parse_module()
        .map_err(|mut e| {
            // Unrecoverable fatal error occurred
            e.into_diagnostic(&handler).emit()
        })
        .expect("failed to parser module");
}
