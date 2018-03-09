import { Steps } from 'antd'
import React from 'react'

class Etape  extends React.Component{
    
    constructor(props){
        super(props);
        console.log(props)
        
    }
    render() {
        
    const etapes = this.props.steps && this.props.steps.map((item,key) => 
        <Steps.Step key={key} status={ item.produits.find(item => item.quantite !=item.quantitePrise) ==null ? 'finish' : 'wait'} title={item.allee +","+ item.section} />
    );
        return (
            <Steps size="small" direction="vertical">
               {etapes}
            </Steps>
        );
    }
}

export default Etape;