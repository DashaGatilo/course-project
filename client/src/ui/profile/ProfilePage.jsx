import {useAuth} from "../../auth/AuthContext";
import {useParams} from "react-router-dom";
import {Button, Card, notification} from "antd";
import {useStore} from "../../store/useStore";
import userService from "../../api/userService";

export const ProfilePage = () => {
    const {user, userRole} = useAuth();
    const {id} = useParams();
    const userId = id ?? user;

    const {data: users} = useStore(userService.getAll, []);

    const hasPermissions = user === id || userRole === 'Admin';

    const userData = users.find(it => it.id === Number(userId));

    if (!userData) {
        return null;
    }

    return (
        <div>
            {hasPermissions ? <Button type="primary" onClick={handleDelete}>Удалить</Button> : null}
            {userData?.username}
            <Card/>
        </div>
    )

    function handleDelete() {
        notification.success({
            message: 'Удалить',
            duration: 100
        })
    }
}