import { signer } from "./constants.ts";
import { askForInput, printRectangle, rl } from "./helpers.ts";
import { approve, deposit, withdraw } from "./strategy/aave/aave.ts";
import { transaction } from "./transaction.ts";
import { handleCLIArgs } from "./cli.ts";

(async () => {
	const publicAddress = await signer.getAddress();
	printRectangle(`ASSET MANAGER ${publicAddress.toUpperCase()} CONNECTED`);

	// if CLI args are passed, skip the user/terminal logic below
	if (await handleCLIArgs()) {
		console.log("Since the user explicitely wants to use this as a CLI only, exiting the program now successfully");
		process.exit(0);
	}

	let done = false;

	const question =
		"Do you wish to: \n [1] make a native currency transfer \n [2] execute a strategy \n [3] exit \n Please choose one of the options listed above: ";

	while (!done) {
		const input = await askForInput(question);
		if (input === "1") {
			await transaction().catch((error) => {
				console.error("Error:", error);
			});
		} else if (input === "2") {
			const strategy_q =
				"Do you wish to: \n [1] deposit into the strategy \n [2] approve funds withdrawal from the strategy \n [3] withdraw from the strategy \n [4] exit \n Please choose one of the options listed above: ";
			const input = await askForInput(strategy_q);

			if (input === "1") {
				await deposit().catch((error) => {
					console.error("Error:", error);
				});
			} else if (input === "2") {
				await approve().catch((error) => {
					console.log("Error:", error);
				});
			} else if (input === "3") {
				await withdraw().catch((error) => {
					console.log("Error:", error);
				});
			} else if (input === "4") {
				done = true;
			} else {
				console.log("Please enter a valid choice");
				console.log(strategy_q);
			}
		} else if (input === "3") {
			done = true;
		} else {
			console.log("Please enter a valid choice");
			console.log(question);
		}
	}
	rl.close();
})();
