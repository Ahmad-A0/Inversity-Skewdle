import { config } from 'dotenv';
import { OpenAI } from 'openai';

// Load environment variables from .env file
config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates a game article by taking a real article excerpt and adding incorrect/tricky sections
 * @param {string} articleText - The original article text to modify
 * @returns {Promise<string>} The modified article text with [] and () sections
 */
async function generateGameArticle(articleText) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o', // Latest model supporting structured outputs
            messages: [
                {
                    role: 'system',
                    content: `You are an article modifier that takes real article excerpts and modifies them to create a fact-checking game.
          You will identify key facts/claims and generate plausible but incorrect alternatives, as well as correct claims that players might think are incorrect.
          
          The output should follow this format:
          - Use [square brackets] to mark incorrect facts/claims
          - Use (parentheses) to mark correct claims that the player might think are incorrect
          - Leave regular text unchanged for confirmed true facts
          
          For example:
          Input: "Last month Apple released the iPhone 15 for $999. It was a huge success."
          Output: "[Last week] Apple released the [Android 15] for ($999). It was a [massive flop]."`,
                },
                {
                    role: 'user',
                    content: `Please modify this article excerpt by identifying 2-4 key facts/claims and:
          1. Adding some incorrect alternatives in [square brackets]
          2. Marking surprising but true facts with (parentheses)
          
          Original text: ${articleText}`,
                },
            ],
            response_format: {
                type: 'json_schema',
                schema: {
                    type: 'object',
                    properties: {
                        modified_text: {
                            type: 'string',
                            description:
                                'The modified article text with [] and () sections',
                        },
                        modifications: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    original: {
                                        type: 'string',
                                        description:
                                            'The original text that was modified',
                                    },
                                    modified: {
                                        type: 'string',
                                        description:
                                            'The modified version with [] or ()',
                                    },
                                    type: {
                                        type: 'string',
                                        enum: ['incorrect', 'surprising_truth'],
                                        description:
                                            'Whether this is an incorrect claim or a surprising truth',
                                    },
                                    reason: {
                                        type: 'string',
                                        description:
                                            'Explanation of why this modification was made',
                                    },
                                },
                                required: [
                                    'original',
                                    'modified',
                                    'type',
                                    'reason',
                                ],
                                additionalProperties: false,
                            },
                        },
                    },
                    required: ['modified_text', 'modifications'],
                    additionalProperties: false,
                },
            },
            temperature: 0.7,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error generating game article:', error);
        throw error;
    }
}

/**
 * Example output: {
  "modified_text": "Apple's latest MacBook Pro features a [Snapdragon] chip and costs ($1999). The laptop has received [mixed reviews] for its performance.",
  "modifications": [
    {
      "original": "M3",
      "modified": "[Snapdragon]",
      "type": "incorrect",
      "reason": "Incorrect processor type - MacBooks use Apple Silicon"
    },
    {
      "original": "$1999",
      "modified": "($1999)",
      "type": "surprising_truth",
      "reason": "The actual price point might seem unusually high but is correct"
    }
  ]
}
 */

// Example usage
const sampleArticle = `Apple's latest MacBook Pro features a powerful M3 chip and costs $1999. The laptop has received widespread praise for its performance.`;

generateGameArticle(sampleArticle)
    .then((result) => {
        const parsed = JSON.parse(result);
        console.log('Modified Article:');
        console.log(parsed.modified_text);
        console.log('\nModifications Made:');
        console.log(parsed.modifications);
    })
    .catch((err) => {
        console.error('Failed to generate article:', err);
    });

export { generateGameArticle };
