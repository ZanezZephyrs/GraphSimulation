import React, { createContext, useContext, useState } from 'react';

export interface elements {
    elements: {
        nodes: {
            data: {
                id: string;
                label:string;
            };
        }[];
        edges: {
            data: {
                id: string;
                source: string;
                target: string;
                weight: number;
            };
        }[];
    }
}

export interface childrenProps {
  children: React.ReactNode;
}

export interface AdjListProviderProps {
  graphElements: elements;
  setInputText: (text: string) => void;
}

const AdjListContext = createContext<AdjListProviderProps | null>(null);

export const AdjListProvider = ({ children }: childrenProps) => {
    const get_empty_graph = (): elements => {
        return {
            elements:{
                nodes:[],
                edges:[],
            }
        }
    }
    const [graphElements, setGraphElements] = useState<elements>(get_empty_graph());


    const AddNode = (graph,nodeID) =>{

        const matches=graph.elements.nodes.filter((node)=> {
            return node.data.id === nodeID
        })
        if (matches.length===0){
            graph.elements.nodes.push({ data: { id: nodeID , label:nodeID} })
        }

    } 

    const setInputText = (text)=>{
        const graph_elements=get_empty_graph();
        const lines=text.split(/\r?\n/)
        const trim_lines=lines.map((text)=> text.trim())
        console.log(graph_elements)
        const res=trim_lines.reduce((acc:elements, line_text) => {
            if(line_text==="") return acc
            const values=line_text.split(' ')
            let [src,dest,weight] = [...values]
            console.log('line_text',src, dest, weight)
            AddNode(acc,src)
            AddNode(acc,dest)
            if(!weight) weight=1;
            if(src && dest ) acc.elements.edges.push({ data: { id: src+dest, weight: weight, source: src, target: dest }})
            return acc;
        },graph_elements)
        setGraphElements(res);
    }

    const providerValue: AdjListProviderProps = {
        graphElements,
        setInputText

    };
    return <AdjListContext.Provider value={providerValue}>{children}</AdjListContext.Provider>;
};



const useAdjList = () =>{
    return useContext(AdjListContext)
};

export default useAdjList;
