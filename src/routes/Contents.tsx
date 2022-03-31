import Content from "../components/Content";

const Documentation = <Content file='Docs.md' markdown/>;
const ReadMe = <Content file='https://raw.githubusercontent.com/SebastianBrack/JuriLang/master/README.md' markdown external />;

export {Documentation, ReadMe};