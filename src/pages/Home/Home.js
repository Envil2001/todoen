import { useEffect, useState } from 'react';
import InputForm from '../../components/InputForm/InputForm';
import './Home.css';

const Home = () => {
    
    const initialValues = {
        wordTitleEn: '',
        wordTitleRu: '',
        phoneticsValue: '',
    }


    const [wordData, setWordData] = useState(initialValues);
    const [words, setWords] = useState([]);
    const [editableUserData, setEditableUserData] = useState({
        isEddit: false,
        wordsIndex: null
    })

  
    useEffect(() => {
      const raw = localStorage.getItem('words') || []
      setWords(JSON.parse(raw));

    }, []);
  
    
    useEffect(() => {
      localStorage.setItem('words', JSON.stringify(words))
    }, [words]);

    const isFieldFields = wordData.wordTitleRu && wordData.wordTitleEn;

    const handleSubmitWords = (e) => {


        if(isFieldFields) {


            let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordData.wordTitleEn}`;
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    if(result.title) {
                        console.log(`Can't find the meaning of ${wordData.wordTitleEn}`)
    
                    } else {
                        console.log(result);
                        const definitions = result[0].meanings[0].definitions[0],
                        phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`,
                        audio = new Audio("https:" + result[0].phonetics[0].audio);
                        
                        wordData.phoneticsValue = phontetics;
    
                        audio.play();
                        
                    }
                    
                })
                .catch(() =>{
                    alert('Error');
                });


            if(editableUserData.isEddit) {
                const editedData = words;

                editedData.splice(editableUserData.wordsIndex, 1, wordData);

                setWords(editedData);

                setEditableUserData({
                    isEddit: false,
                    wordsIndex: null
                })
            } else {
                setWords((prevState) => [...prevState, wordData]);
            }
            
            setWordData(initialValues);
        } else {
            alert('ДА ТЫ ЗАДРАЛ СО СВОИМИ ПРОВЕРочками..');
        }
    }   

    const handleRemoveClick = (index) => {
        setWords(words.filter((user, userIndex) => userIndex !== index));
    }

    const handleEditClick = (data, index) => {
        setWordData(data);
        setEditableUserData({
            isEddit: true,
            wordsIndex: index
        })
    }

    const handleInputChange = (e, inputName) => setWordData((prevState) => ({
        ...prevState,
        [inputName]: e.target.value
    }))

    return (
        <div className="container">
            <h1 className="title-page">
                HOME
            </h1>

            <ul className="wrapper">
                {words.map((user, index) => (
                    <li className="term" key={index}>
                    <div className="contentWrapper">
                        <div className="contentWrapper-title1">
                            <h4>{user.wordTitleEn}</h4>
                            <p>{user.phoneticsValue}</p>
                        </div>
                        <div className="contentWrapper-title2">
                            {user.wordTitleRu}
                        </div>
                    </div>
                    <div className="actions">
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            width="50" height="50"
                            viewBox="0 0 172 172"
                            style={{fill: "#000000"}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDashoffset="" strokeDashoffset="0"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M91.53625,6.88c-2.29781,0 -4.48812,0.95406 -6.03344,2.63375l-42.28781,45.52625h-26.015c-5.65719,0 -10.32,4.66281 -10.32,10.32v41.28c0,5.65719 4.66281,10.32 10.32,10.32h26.015l42.28781,45.52625c1.54531,1.67969 3.73562,2.63375 6.03344,2.63375c4.50156,0 8.22375,-3.72219 8.22375,-8.22375v-141.7925c0,-4.50156 -3.72219,-8.22375 -8.22375,-8.22375zM91.53625,13.76c0.77938,0 1.34375,0.56438 1.34375,1.34375v141.7925c0,0.77938 -0.56437,1.34375 -1.34375,1.34375c-0.38969,0 -0.73906,-0.16125 -0.99437,-0.43l-42.38188,-45.63375v-52.3525l42.36844,-45.63375c0.26875,-0.28219 0.61813,-0.43 1.00781,-0.43zM136.55188,35.85125l-3.85656,5.68406c15.25156,8.96281 25.54469,25.51781 25.54469,44.46469c0,18.94688 -10.29312,35.50188 -25.54469,44.46469l3.85656,5.68406c17.07906,-10.2125 28.56812,-28.83687 28.56812,-50.14875c0,-21.31187 -11.48906,-39.93625 -28.56812,-50.14875zM124.95531,52.90344l-3.89688,5.72438c9.82281,5.20031 16.54156,15.50687 16.54156,27.37219c0,11.86531 -6.71875,22.17188 -16.54156,27.37219l3.89688,5.72438c11.63687,-6.47688 19.52469,-18.86625 19.52469,-33.09656c0,-14.23031 -7.88781,-26.61969 -19.52469,-33.09656zM17.2,61.92h24.08v48.16h-24.08c-1.92156,0 -3.44,-1.51844 -3.44,-3.44v-41.28c0,-1.92156 1.51844,-3.44 3.44,-3.44zM113.25125,70.13031l-4.01781,5.92594c4.43438,1.15563 7.72656,5.14656 7.72656,9.94375c0,4.79719 -3.29219,8.78813 -7.72656,9.94375l4.01781,5.92594c6.20813,-2.60687 10.58875,-8.73437 10.58875,-15.86969c0,-7.13531 -4.38062,-13.27625 -10.58875,-15.86969z"></path></g></g></svg>
                        </span>
                        <span className="edit" onClick={() => handleEditClick(user, index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                        </span>
                        <span onClick={() => handleRemoveClick(index)}>
                            <svg className="delete" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </span>
                    </div>
                </li>   
                ))
                }
            </ul>

            <div className="addWrapper">
                <InputForm 
                    placeholder="Ru"
                    handleChange={handleInputChange}
                    value={wordData.wordTitleRu}
                    fieldName="wordTitleRu"
                />

                <InputForm 
                    placeholder="En"
                    handleChange={handleInputChange}
                    value={wordData.wordTitleEn}
                    fieldName="wordTitleEn"
                />

            </div>
            <button type="button" disabled={!isFieldFields} className="addWord" onClick={handleSubmitWords}>{editableUserData.isEddit  ? 'Edit word' : 'Add word'}</button>
        </div>
    )
}

export default Home;