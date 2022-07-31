
export const getVerdict = (points: number, verdictDoc: any) => {

    if (verdictDoc.verdicts) {
        const verdicts = verdictDoc.verdicts;
        // Object.keys(resultText).map((item) => arr.push(+item));
        // arr.sort();
        
        if (points < verdicts[1].minPoints) {
            return {
                status: verdicts[0].status,
                description: verdicts[0].description,
                icon: verdicts[0].icon,
            }
        }
        else if (points === verdicts[1].minPoints 
                || (points > verdicts[1].minPoints 
                    && points < verdicts[2].minPoints))  {
            return {
                status: verdicts[1].status,
                description: verdicts[1].description,
                icon: verdicts[1].icon,
            }
        } 
        else return {
            status: verdicts[2].status,
            description: verdicts[2].description,
            icon: verdicts[2].icon,
        }
    }
}
