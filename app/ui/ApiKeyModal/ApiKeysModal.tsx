'use client';

import ModalWrapper from '../core/ModalWrapper';
import { MODAL_APIKEY_INPUT } from '../../models/apiKeyInputEnum';
import useApiKeyModal from './useApiKeyModal';
import CustomSelect from '../core/CustomSelect';
import { AiServiceValues, SpeechServiceValues } from '../../models/servicesOptionValues';

const ApiKeysModal = () => {
	const { speechService, speechApiKey, aiService, aiApiKey, handleChange, handleSave } = useApiKeyModal();

	return (
		<ModalWrapper
			open={true}
			className='w-full max-w-[450px] h-auto'>
			<div className='w-full p-4 flex flex-col gap-y-4'>
				<div className='relative px-2'>
					<CustomSelect
						id={MODAL_APIKEY_INPUT.SPEECH_SERVICE}
						value={speechService}
						options={SpeechServiceValues}
						onChange={(val) => handleChange(MODAL_APIKEY_INPUT.SPEECH_SERVICE, val)}
					/>
				</div>
				<div className='relative px-2'>
					<div className='inputWrapper'>
						<input
							id={MODAL_APIKEY_INPUT.SPEECH_API_KEY}
							placeholder='Speech API Key'
							defaultValue=''
							className='w-full'
							type='text'
							value={speechApiKey}
							onChange={(e) => handleChange(MODAL_APIKEY_INPUT.SPEECH_API_KEY, e.target.value)}
						/>
					</div>
				</div>

				<div className='relative px-2'>
					<CustomSelect
						id={MODAL_APIKEY_INPUT.AI_SERVICE}
						value={aiService}
						options={AiServiceValues}
						onChange={(val) => handleChange(MODAL_APIKEY_INPUT.AI_SERVICE, val)}
					/>
				</div>
				<div className='relative px-2'>
					<div className='inputWrapper'>
						<input
							id={MODAL_APIKEY_INPUT.AI_API_KEY}
							placeholder='AI API Key'
							defaultValue=''
							className='w-full'
							type='text'
							value={aiApiKey}
							onChange={(e) => handleChange(MODAL_APIKEY_INPUT.AI_API_KEY, e.target.value)}
						/>
					</div>
				</div>

				<div className='w-full flex gap-x-3 justify-end items-center'>
					<button className='w-full max-w-[150px] flex justify-center items-center py-2 bg-notable-primary-100 rounded-md'>Cancel</button>
					<button
						onClick={() => handleSave()}
						className='w-full max-w-[150px] rounded-md bg-notable-red-200 flex justify-center items-center py-2'>
						Save keys
					</button>
				</div>
			</div>
		</ModalWrapper>
	);
};

export default ApiKeysModal;
