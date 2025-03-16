// Core, Team, and Official extensions can `require` VM code:
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const TargetType = require('../../extension-support/target-type');


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
            id: 'someBlocks',
            name: 'Some Blocks',
            blocks: [
                {
                    opcode: 'myReporter',
                    blockType: BlockType.REPORTER,
                    text: 'letter [LETTER_NUM] of [TEXT]',
                    arguments: {
                        LETTER_NUM: {
                            type: ArgumentType.STRING,
                            defaultValue: '1'
                        },
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
     * @returns {string} a string which includes the block argument value.
     */
    myReporter (args) {
        // This message contains ICU placeholders, not Scratch placeholders
        const message = formatMessage({
            id: 'myReporter.result',
            defaultMessage: 'Letter {LETTER_NUM} of {TEXT} is {LETTER}.',
            description: 'The text template for the "myReporter" block result'
        });

        // Note: this implementation is not Unicode-clean; it's just here as an example.
        const result = args.TEXT.charAt(args.LETTER_NUM);

        return message.format({
            LETTER_NUM: args.LETTER_NUM,
            TEXT: args.TEXT,
            LETTER: result
        });
    };
}

module.exports = Scratch3TestBlocks