import {Button} from "antd";
import {onlyForAdmin} from "../onlyForAdmin";
import {useUserNavigate} from "./useUserNavigate";

export const GoToUsersPageLink = onlyForAdmin(() => {
    const {goToUserListPage} = useUserNavigate();
    return (
        <Button type='link' onClick={goToUserListPage}>
            Пользователи
        </Button>
    )
})