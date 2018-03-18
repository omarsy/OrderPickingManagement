import { Steps } from 'antd'
import React from 'react'

class Etape  extends React.Component{
    
    constructor(props){
        super(props);
        console.log(props,"ETAPE")
        
    }
    render() {
        
    const etapes = this.props.steps && this.props.steps.map((item,key) => 
        <Steps.Step key={key} status={ (Object.keys(item.produits).find(key => {return item.produits[key].quantite != item.produits[key].quantitePrise}) == null) ? 'finish' : 'wait'} title={"Allee: "+item.allee +",Section: "+ item.section} />
    );
        return (
            <Steps size="small" direction="vertical">
               {etapes}
            </Steps>
        );
    }
}

export default Etape;