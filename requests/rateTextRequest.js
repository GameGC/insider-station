const MonkeyLearnClass = require('monkeylearn')
const MonkeyLearnInstance = new  MonkeyLearnClass('2c39ecdd8857791f2b76ab883938d3543c11e7c1')

async function Sentiment_MonkeyLearn(text:string)
{
    let model_id = 'cl_pi3C7JiL'
    let data = ["This is a great tool!"]
    const response = await MonkeyLearnInstance.classifiers.classify(model_id, data);
    console.dir(response)
}
