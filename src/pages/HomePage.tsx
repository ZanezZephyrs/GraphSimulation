import React from 'react';
import styled from 'styled-components';
import GraphDisplayArea from '../components/graph'
import useAdjList, {AdjListProviderProps} from '../contexts/AdjListContext';
const HomePage = () => {

    const {setInputText} = useAdjList() as AdjListProviderProps;
    
    const handleTextAreaChange = (text) =>{
        console.log(text)
        setInputText(text)
    }

    return (
    <HomePageWrapper>
        <HomePageHeader>
            <h1> Graph simulations </h1>
            <p>write your graph in a adjacency list form and we wil draw it for you</p> 

        </HomePageHeader>
        <HomePageContent>
            
            <InputTextArea onChange={change => handleTextAreaChange(change.currentTarget.value)}/>
            <GraphDisplayArea/>
        </HomePageContent>
    </HomePageWrapper>
    );
}

export default HomePage;


const HomePageWrapper= styled.div`

    background: #8cc0c2;
    min-height: 100vh;


`

const HomePageHeader= styled.div`
    text-align:center;

    & h1{
        margin-top:0;
        padding:0;
    }

`

const HomePageContent= styled.div`
    min-height: 80vh;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:center;

`

const InputTextArea= styled.textarea`
    min-height: 80vh;
    width:25%;
    min-width:300px;
    margin:20px;
    font-size:24px;
    text-align:left;
`