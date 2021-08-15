import React,{useRef,useEffect} from 'react';
import styled from 'styled-components';
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import useAdjList, {AdjListProviderProps} from '../contexts/AdjListContext';

const Graph = () => {  

    const {graphElements}=useAdjList() as AdjListProviderProps;

    console.log('elem',graphElements)
    // const [isMounted, setIsMounted] = useState(false);
    // const [cy,setCy]=useState<cytoscape.Core>();
  
    // useEffect(()=>{
    //   console.log('mount', cyRefC.current)
    //   cyRefC.current.mount(divRef.current as unknown as HTMLElement)
    //   cyRefC.current.center();
    // })

      // useEffect(()=>{
      //     if(cyRefC.current){
      //       console.log('remove')
      //       // cyRefC.current.remove('node')
      //       cyRefC.current.add(graphElements.elements);
      //     }
      //   },[ graphElements])

    // const addNode=()=>{
    //     cy.add({
            
    //             nodes: [
    //               {
    //                 data: { id: 'c' }
    //               }
    //             ],
    //             edges:[
    //                 {
    //                     data: { id: 'ac', source: 'a', target: 'c' },
    //                 },
    //                 {
    //                     data: { id: 'bc', source: 'b', target: 'c' }
    //                 }
    //             ]
    //         }
    //     )
    //     cy.layout({'name':'cose'}).run();
    // }

    useEffect(()=>{
      if(cyRefC.current){
          cyRefC.current.elements().remove();
          cyRefC.current.add(graphElements.elements);
          cyRefC.current.layout({ name: 'cose' }).run()
      }
   },[graphElements]);
    
    const cyRefC=useRef<cytoscape.Core | null >(null)
    // const update =(cy) =>{
    //   cy.remove('node');
    //   cy.add(graphElements.elements);
    // //         cy.add(graphElements.elements);
    // }
    console.log('rerender')
     
    const layout = { name: 'cose' };
    // const divRef=useRef(null);
    return (
    <React.Fragment>
        {/* <h1>algo</h1> */}
        {/* <AddNodeButton onClick={addNode}>Add a node </AddNodeButton> */}
        {/* <GraphDiv ref={divRef} id="a">
            
        </GraphDiv> */}
          <GraphDiv elements={
            CytoscapeComponent.normalizeElements( graphElements.elements)} 
            cy={(cy)=> cyRefC.current=cy}
            layout={layout}/>;
    </React.Fragment>
    );
}

export default Graph;


const GraphDiv =styled(CytoscapeComponent)`
    min-height:80vh;
    background:#fff;
    flex:1;
    margin:20px;
`

// const AddNodeButton =styled.button`
//     padding:10px;
//     margin:10px;

    
// `