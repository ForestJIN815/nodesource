const Room = require("../schema/room");
const Chat = require("../schema/chat");

exports.removeRoom = async (roomId) => {
  try {
    // 방 제거
    await Room.deleteOne({ _id: roomId });
    // 채팅 제거
    await Chat.deleteOne({ room: roomId });
  } catch (error) {
    throw error;
  }
};
