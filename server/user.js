const users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = name.trim().toLowerCase();


    const userexist = users.find((user) => user.name == name && user.room == room);

    if (userexist)
    {
        return { error : "user name is taken"};
    }
    const user = {id, name, room};
    users.push(user);
    return {user};
}
const removeUser = (id) => {
    const index = users.findIndex(user => user.id == id);
    if (index != -1)
    {
        return users.splice(index,1)[0];
    }
}


const getUser = (id) => {
    let user = users.find((user) => user.id == id);

    return user;
}

const getusersInRoom = (room) =>{
        const us  =  users.filter((user) => user.room == room);
        return us;
}


module.exports = {addUser, getUser, getusersInRoom, removeUser}