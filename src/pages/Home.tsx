import { Title } from "../components/Title";
import {Text} from "../components/Text";


export default function Home() {

  return (
    <div>
        <Title text = "Animal Quiz." variant="primary"/>
        <Text variant="primary">
            This is a quick Game Quiz developed by {""}
            <a href="https://github.com/goncalvespedroo">Pedro Gonçalves</a>
        </Text>



      <button>Start</button>
    </div>
  );
}
