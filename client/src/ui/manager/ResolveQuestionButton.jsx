// resolve pending, resolve;

import {Button} from "antd";
import questionService from "../../api/questionService";
import {onlyForManager} from "../onlyForAdmin";
import {useState} from "react";

export const ResolveQuestionButton = onlyForManager(({question, onSuccess}) => {
    const [isLoading, setIsLoading] = useState(false);

    if (question.status === 'resolve') {
        return (
            <Button loading={isLoading} onClick={open}>
                Открыть вопрос
            </Button>
        )
    }

    if (question.status === 'pending') {
        return (
            <Button loading={isLoading} onClick={close}>
                Закрыть вопрос
            </Button>
        )
    } else {
        return undefined;
    }

    function close() {
        changeStatus('resolve')
    }

    function open() {
        changeStatus('pending')
    }

    function changeStatus(status) {
        setIsLoading(true)
        questionService.updateQuestion(question.id, {
            ...question,
            status
        }).then(onSuccess).finally(() => setIsLoading(false))
    }
})