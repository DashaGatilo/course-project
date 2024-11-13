import {useStore} from "../../store/useStore";
import userService from "../../api/userService";
import {Avatar, Button, List} from "antd";
import {onlyForAdmin} from "../onlyForAdmin";
import {useUserNavigate} from "./useUserNavigate";

export const UserList = onlyForAdmin(() => {
    const {data: users} = useStore(userService.getAll, []);
    const {goToUser} = useUserNavigate();
    return (
        <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}/>}
                        title={<Button type="link" onClick={() => goToUser(item.id)}>{item.username}</Button>}
                    />
                </List.Item>
            )}
        />
    )
})