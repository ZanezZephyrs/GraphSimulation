import React,{useRef,useEffect,useState} from 'react';
import styled from 'styled-components';
import cytoscape, { ElementsDefinition } from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import { options } from '../contants/graphLayout';
import { randomInt } from 'crypto';
import useAdjList, {AdjListProviderProps} from '../contexts/AdjListContext';
import Immutable from 'immutable'

const Teste = () => {  

    const {graphElements}=useAdjList() as AdjListProviderProps;


    const [isMounted, setIsMounted] = useState(false);
    const [cy,setCy]=useState<cytoscape.Core>();

    const ins = cytoscape({
        layout: {'name':'cose'},
        elements: [ // flat array of nodes and edges
          { // node n1
            group: 'nodes', // 'nodes' for a node, 'edges' for an edge
            // NB the group field can be automatically inferred for you but specifying it
            // gives you nice debug messages if you mis-init elements
      
      
            data: { // element data (put json serialisable dev data here)
              id: 'n1', // mandatory (string) id for each element, assigned automatically on undefined
              parent: 'nparent', // indicates the compound node parent id; not defined => no parent
              // (`parent` can be effectively changed by `eles.move()`)
            },
      
            // scratchpad data (usually temp or nonserialisable data)
            scratch: {
              _foo: 'bar' // app fields prefixed by underscore; extension fields unprefixed
            },
      
            position: { // the model position of the node (optional on init, mandatory after)
              x: 100,
              y: 100
            },
      
            selected: false, // whether the element is selected (default false)
      
            selectable: true, // whether the selection state is mutable (default true)
      
            locked: false, // when locked a node's position is immutable (default false)
      
            grabbable: true, // whether the node can be grabbed and moved by the user
      
      
      
            // DO NOT USE THE `style` FIELD UNLESS ABSOLUTELY NECESSARY
            // USE THE STYLESHEET INSTEAD
            style: { // style property overrides 
              'background-color': 'red'
            }
          },
      
          { // node n2
            data: { id: 'n2' },
            renderedPosition: { x: 200, y: 200 } // can alternatively specify position in rendered on-screen pixels
          },
      
          { // node n3
            data: { id: 'n3', parent: 'nparent' },
            position: { x: 123, y: 234 }
          },
      
          { // node nparent
            data: { id: 'nparent' }
          },
      
          { // edge e1
            data: {
              id: 'e1',
              // inferred as an edge because `source` and `target` are specified:
              source: 'n1', // the source node id (edge comes from this node)
              target: 'n2'  // the target node id (edge goes to this node)
              // (`source` and `target` can be effectively changed by `eles.move()`)
            },
      
          }
        ],
        style:[
            {
              selector: 'node',
              style: {
                'content': 'data(id)',
                'background-color': 'red',
                'width':'4px',
                'height':'4px',
                'font-size':'2px',
                'transition-property':'position',
                'transition-duration': 3
              }
            },
            {
                selector: 'edges',
                style: {
                  'width':'1px',
                }
              }
        ]
      });   
    
    const cyRef=useRef(ins); 
      
    //   }
    // })
  
    useEffect(()=>{
      console.log('mount', cyRef.current)
      cyRef.current.mount(divRef.current as unknown as HTMLElement)
      cyRef.current.center();
    })

      useEffect(()=>{
          if(cyRef.current){
            console.log('remove')
            // cyRef.current.remove('node')
            cyRef.current.add(graphElements.elements);
          }
        },[ graphElements])

    // const addNode=()=>{
        // cy.add({
            
        //         nodes: [
        //           {
        //             data: { id: 'c' }
        //           }
        //         ],
        //         edges:[
        //             {
        //                 data: { id: 'ac', source: 'a', target: 'c' },
        //             },
        //             {
        //                 data: { id: 'bc', source: 'b', target: 'c' }
        //             }
        //         ]
        //     }
        // )
    //     cy.layout({'name':'cose'}).run();
    // }
    
    // let cyRef=useRef<cytoscape.Core>(null)
    const update =(cy) =>{
      cy.remove('node');
      cy.add(graphElements.elements);
    //         cy.add(graphElements.elements);
    }

    const [ele, setEle]= useState({
            
        nodes: [
            {
                data: { id: 'd',label:'d' }
              },
            {
                data: { id: 'f',label:'f' }
              },
          {
            data: { id: 'g',label:'g' }
          }
        ],
        edges:[
            {
                data: { id: 'dg', source: 'd', target: 'g' },
            },
            {
                data: { id: 'fg', source: 'f', target: 'g' }
            }
        ]
    });
  

     
     useEffect(()=>{
        if(cyRefC.current){
            cyRefC.current.elements().remove();
            cyRefC.current.add(ele);
            cyRefC.current.layout({ name: 'cose' }).run()
        }
     },[ele]);

     const updateEle = () =>{
         console.log(cyRefC.current)
         if(cyRefC.current){
            setEle({
            
                nodes: [
                    {
                        data: { id: 'a',label:'a' }
                      },
                    {
                        data: { id: 'b',label:'b' }
                      },
                  {
                    data: { id: 'c',label:'c' }
                  }
                ],
                edges:[
                    {
                        data: { id: 'ac', source: 'a', target: 'c' },
                    },
                    {
                        data: { id: 'bc', source: 'b', target: 'c' }
                    }
                ]
            })

         }
     }

     const cyRefC=useRef<cytoscape.Core>();
     
    const layout = { name: 'cose' };
    const divRef=useRef(null);
    return (
    <React.Fragment>
        <button onClick={updateEle}>algo</button>
       <CytoscapeComponent cy={(cy)=> cyRefC.current=cy} elements={CytoscapeComponent.normalizeElements(ele)} style={ { width: '600px', height: '600px' } } layout={layout}/>
    </React.Fragment>
    );
}

export default Teste;


const GraphDiv =styled.div`
    min-height:80vh;
    background:#fff;
    flex:1;
    margin:20px;
`

const AddNodeButton =styled.button`
    padding:10px;
    margin:10px;

    
`