// Core, Team, and Official extensions can `require` VM code:
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const TargetType = require('../../extension-support/target-type');

const formatMessage = require('format-message');

class Scratch3TestBlocks {
    constructor (runtime) {
        /**
         * Store this for later communication with the Scratch VM runtime.
         * If this extension is running in a sandbox then `runtime` is an async proxy object.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }
    getInfo () {
        return {
            id: 'brb',
            name: 'Blue Ridge Boost',
            blocks: [
                {
                    opcode: 'test',
                    blockType: BlockType.REPORTER,
                    text: '[TEXT] starts with "a"',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'text'
                        }
                    }
                }
            ]
        };
    }
    /**
     * Implement myReporter.
     * @param {object} args - the block's arguments.
     * @property {string} MY_ARG - the string value of the argument.
     * @returns {boolean} a string which includes the block argument value.
     */
    test (args) {
        // This message contains ICU placeholders, not Scratch placeholders
        const message = formatMessage({
            id: 'test.result',
            defaultMessage: '{TEXT} starts with "a".',
            description: 'The text template for the "test" block result'
        });

        // Note: this implementation is not Unicode-clean; it's just here as an example.
        const result = args.TEXT.charAt(0);

        return result;
    };
}

module.exports = Scratch3TestBlocks