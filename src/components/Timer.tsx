import { Button } from './Button';
import { useState, useEffect } from 'react';

import '../styles/Timer.scss';
import { setTimeout } from 'timers';

export function Timer() {
    const [quantity, setQuantity] = useState(0)
    const [time, setTime] = useState(3 * 60)

    const [value, setValue] = useState([true, false, false])
    function toggleEnableButton( value: number ) {
        //seleciona qual botão de menu está ativado e adiciona os timers de cada um.
        switch (value) {
            case 0:
                setValue([true, false, false])

                setTime(3 * 60)
                break

            case 1: 
                setValue([false, true, false])

                setTime(5 * 60)
                break

            case 2: 
                setValue([false, false, true])

                setTime(15 * 60)
                break
        }
    }

    const [isActive, setIsActive] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('')
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')

    const [stateButton, setStateButton] = useState('Iniciar')
    const [hasClicked, setHasClicked] = useState(false)
    function handleClick() {
        //qunado o clique do botão está ativado.
        if (hasClicked === false) {
            setIsActive(true)

            setHasClicked(!hasClicked)
            setStateButton('Pausar')
        }

        //quando o clique do botão está desativado.
        else { 
            setIsActive(false)

            setHasClicked(!hasClicked)
            setStateButton('Iniciar')
        }
    }

    useEffect( () => { 
        Notification.requestPermission()
    })

    useEffect( () => {
        if (isActive && time > 0) {
            setTimeout( () => {
                setTime(time - 1)
            }, 10)       
        }

        else if (isActive && time === 0) {
            new Notification("Vamos lá!")

            if (quantity < 4) {
                //verifica se o programa já está no componente Button-Pequena pausa- ou no Button-Longa pausa-.
                if ( value.toString() === [false, true, false].toString() || value.toString() === [false, false, true].toString() ) {
                    toggleEnableButton(0)
                }

                else if (quantity === 3) {
                    setQuantity(0)

                    toggleEnableButton(2)
                }

                else { 
                    setQuantity(quantity + 1)

                    toggleEnableButton(1)
                }
            }

            //sempre no fim de cada execução, verifica se o timer continua ativo e os estados do botão.
            handleClick()
        }
    }, [isActive, time])


    return (
        <main>
            <div className="button-group">
                <Button activate={ value[0].toString() } onClick={ () => toggleEnableButton(0) }>Pomodoro</Button>
                <Button activate={ value[1].toString() } onClick={ () => toggleEnableButton(1) }>Pequena pausa</Button>
                <Button activate={ value[2].toString() } onClick={ () => toggleEnableButton(2) }>Longa pausa</Button>
            </div>
            
            <div className="timer">
                <div className="content">
                    <div className="numbers">
                        <div className="square">{ minutesLeft }</div>
                        <div className="square">{ minutesRight }</div>

                        <div className="separator">
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div> 
                    </div>

                    <p>Minutos</p>
                </div>

                <div className="content">
                    <div className="numbers">
                        <div className="square">{ secondsLeft }</div>
                        <div className="square">{ secondsRight }</div>
                    </div>

                    <p>Segundos</p>
                </div>
                
            </div>
            <Button className="start-button" onClick={ () => { handleClick() } } clicked={ hasClicked.toString() }>{ stateButton }</Button>
        </main>
    )
}