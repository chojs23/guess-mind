// eslint-disable-next-line no-undef
const socket = io("/");

socket.on("hello", () => console.log("somebody joined")); //hello event발생 시

socket.emit("hi");
