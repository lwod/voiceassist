import * as tf from "@tensorflow/tfjs"
import * as SpeechCommands from "@tensorflow-models/speech-commands"

// import VoiceModel from "AI_MODELS/voice_model"
// import path from 'path'
import VoiceModelMetadata from "./AI_MODELS/voice_model/metadata.json"

export default class VoiceAssistant{
	constructor() {
		this.options = {
			includeSpectrogram: true,
			overlapFactor: 0.5,
			invokeCallbackOnNoiseAndUnknown: false,
			probabilityThreshold: 0.75
		}
	}
	
	async buildModel(){
		const recognizer = await SpeechCommands.create(
			"BROWSER_FFT",
			undefined,
			"https://teachablemachine.withgoogle.com/models/",
			// VoiceModel,
			VoiceModelMetadata)
		
		await recognizer.ensureModelLoaded();
		
		return recognizer
	}
	
	async startAssistant(){
		this.recognizer = await this.buildModel()
		
		this.recognizer.listen((result) => {
			const scores = result.scores;
			console.log(scores)
		}, this.options)
	}
	
	// async stopAssistant(){
	// 	await this.recognizer.stopListening()
	// }
}