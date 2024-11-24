import {useAuth} from "../../auth/AuthContext";
import {useParams} from "react-router-dom";
import {Button, Col, notification, Row, Typography} from "antd";
import {useStore} from "../../store/useStore";
import userService from "../../api/userService";
import {useUserNavigate} from "../admin/useUserNavigate";

export const ProfilePage = () => {
    const {user, userRole} = useAuth();
    const {id} = useParams();
    const userId = id ?? user;
    const {goToUserListPage} = useUserNavigate();

    const {data: users} = useStore(userService.getAll, []);

    const hasPermissions = user === id || userRole === 'admin';

    const userData = users.find(it => it.id === Number(userId));

    if (!userData) {
        return null;
    }

    return (
        <Row align="middle">
            <Col offset={6} span={12}>
                <Typography.Title level={2}>
                    Имя: {userData?.username}
                </Typography.Title>
                <Typography.Title level={2}>
                    Роль: {userData?.role}
                </Typography.Title>
                {hasPermissions ? <Button type="primary" onClick={handleDelete}>Удалить</Button> : null}
            </Col>
        </Row>
    )

    function handleDelete() {
        userService.delete(userId)
        notification.success({
            message: 'Пользователь удален',
            duration: 100
        })
        goToUserListPage()
    }
}