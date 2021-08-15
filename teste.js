const get_empty_graph = () => {
    return {
        elements:{
            nodes:[],
            edges:[],
        }
    }
}

const AddNode = (graph,nodeID) =>{

    const matches=graph.elements.nodes.filter((node)=> {
        return node.data.id === nodeID
    })
    if (matches.length===0){
        graph.elements.nodes.push({ data: { id: nodeID } })
    }

} 

const setInputText = (text)=>{
    const graph_elements=get_empty_graph();
    const lines=text.split(/\r?\n/)
    const trim_lines=lines.map((text)=> text.trim())
    console.log(graph_elements)
    const res=trim_lines.reduce((acc, line_text) => {
        if(line_text==="") return acc
        const values=line_text.split(' ')
        let [src,dest,weight] = [...values]
        console.log('line_text',`${line_text}T`)
        AddNode(acc,src)
        AddNode(acc,dest)
        if(!weight) weight=1;
        acc.elements.edges.push({ data: { id: src+dest, weight: weight, source: src, target: dest }})
        return acc;
    },graph_elements)
    return res;
}

const string='1 2 \n 1 3 4\n 5 6\n'
console.log(JSON.stringify(setInputText(string)))
