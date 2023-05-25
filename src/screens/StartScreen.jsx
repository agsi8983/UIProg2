/**
 * File: StartScreen.jsx 
 * 
 * This file contains logic for the Start page of the Ratman game.
 * It renders an animated Ratman, allows navigation between components  
 * 
 * 
 * Version: 1.0 
 * Authors: Michaela Nordness, Agnes Sidemo, Emmy Svensson 
 */

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Rat from '../components/Rat';
import Cheese from '../components/Cheese';

import LanguageContext from '../components/LanguageContext'

function StartScreen(){
    const [open, setOpen] = useState(false);
    const language = useContext(LanguageContext);
    const navigate = useNavigate();

    // Animates rat 
    useEffect(() => {
        setTimeout(() => {
          setOpen(!open)
        }, 200)
      }, [open])

    // Navigates to Gameboard 
    function navGameBoard(event){
        event.preventDefault();
        navigate('GameBoard')
   }
   // Navigates to the tutorial page 
   function navTutorial(event){
    event.preventDefault();
    navigate('Tutorial')
    }
    // Navigates to settings page 
    function navSettings(event){
        event.preventDefault();
        navigate('Settings')
    }
    

    return(
        <div className='body'>
            <h1>{language.headerComponent.titleText}</h1>
                <div className='row'
                    style={{height:'20%',width:'20%'}}>
                        <Rat open={open}/><Cheese/>
                </div>
                <form onSubmit={navGameBoard}>
                    <button 
                        style={styles}
                        type='submit'>
                            {language.startButton.buttonText}
                        </button>
                    </form>
                    <form onSubmit={navTutorial}>
                        <button 
                        style={styles}
                            type='submit'>
                                {language.tutorialButton.buttonText}
                        </button>
                    </form>
                    <form onSubmit={navSettings}>
                        <button 
                        style={styles}
                            type='submit'>
                                {language.settingsButton.buttonText}
                        </button>
                    </form>
            </div>
    )
   }

const styles = {
    backgroundColor:'black', 
    color:'white', 
    fontSize:22, 
    width: 280, 
    height:60, 
    margin:10,
    borderRadius:15, 
    alignSelf:'center',
    fontWeight:'bold'
}

export default StartScreen;
//************
// END of file StartScreen.jsx 
//************