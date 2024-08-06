import { useState } from "react"
import useTimeout from "./useTimeout";

const useCopyToClipboard = ()=> {
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const {oneExecute: successCase} = useTimeout(() => setSuccess(false), 2000);
    const {oneExecute: errorCase} = useTimeout(() => setError(false), 2000);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
			setSuccess(true);
            successCase();
		}).catch(()=>{
            setError(true);
            errorCase();
        });
    }

    return [copyToClipboard, { error, success }] as const;
}

export default useCopyToClipboard;