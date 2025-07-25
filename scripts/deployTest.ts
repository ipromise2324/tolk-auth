import { toNano } from '@ton/core';
import { main } from '../wrappers/Main';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const test = provider.open(
        main.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('Test'),
        ),
    );

    await test.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(test.address);

    console.log('ID', await test.getID());
}
