import RabbitIcon from '../assets/svg/rabbit.svg'
import LionIcon from '../assets/svg/lion.svg'
import DeerIcon from '../assets/svg/deer.svg'


export const getVerdict = (points: number, resultText: any) => {
    let arr: number[] = [];

    if (resultText) {
        Object.keys(resultText).map((item) => arr.push(+item));
        arr.sort();

        if (points < arr[1]) {
            return {
                text: resultText[arr[0]],
                svg: RabbitIcon
            }
        }
        else if (points === arr[1] || (points > arr[1] && points < arr[2]))  {
            return {
                text: resultText[arr[1]],
                svg: DeerIcon
            }
        } 
        else return{
            text: resultText[arr[2]],
            svg: LionIcon
        }
    }
}
