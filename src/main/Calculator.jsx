import React, { Component } from "react";
import Button from "../components/Button";
import Display from "../components/Display";
import './Calculator.css';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, null],
    current: 0
}

export default class Calculator extends Component {

    state = {...initialState};

    outroNome(){
        const sliceValue = this.state.displayValue.toString();
        console.log(sliceValue)

        if(sliceValue === '0'){
            return;
        } else if (sliceValue.length === 1){
            this.setState({ ...initialState })
            return;
        }

        const displayValue = sliceValue.slice(0,-1);
        this.setState({ displayValue });
    
    };

    clearMemory() {
        if(this.state.displayCount !== '' && this.state.displayValue === '0'){
            this.setState({ ...initialState });
        } else if (this.state.displayCount !== ''){
            
            const values = [];
            values[0] = this.state.values[0];
            values[1] = null;
            
            this.setState({ values, displayValue: '0' });
        } else {
            this.setState({...initialState});
        }
    };

    setOperation(operation){
        if (this.state.current === 0){
            this.setState({ operation, current: 1, clearDisplay: true});
        } else{
            const equals = false;
            const currentOperation = this.state.operation;
            const values = [...this.state.values];

            var count;
            var displayValue;


            switch(operation){
                case '%':
                    count = values[0] + (values[0] * (values[1]/100));
                break;

                case '+':
                    count = values[0] + values[1];
                break;

                case '-':
                    count = values[0] - values[1];
                break;

                case '/':
                    count = values[0] / values[1];
                break;

                case '*':
                    count = values[0] * values[1];
                break;

                default:
                    try {
                        count = eval(`${values[0]} ${currentOperation} ${values[1]}`);
                    } catch(e) {
                        count = this.state.values[0];
                    }
                break;
            }

            values[0] = count;
            values[1] = 0;

            displayValue = count;

            this.setState({
                displayValue,
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            });
        };
    };

    addDigit(digit){
        
        if(digit === '.' && this.state.displayValue.includes('.')) {
            return;
        } else if (digit === '.' && this.state.displayValue === '0'){
            this.setState({ displayValue : '0.' });
            return;
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;        
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + digit;

        this.setState({ displayValue, clearDisplay: false });

        if(digit !== '.'){
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;

            this.setState({ values })
        }
    };

    deleteDigit(){
        const sliceValue = this.state.displayValue.toString();
        console.log(sliceValue)

        if(sliceValue === '0'){
            return;
        } else if (sliceValue.length === 1){
            this.setState({ ...initialState })
            return;
        }

        const displayValue = sliceValue.slice(0,-1);
        this.setState({ displayValue });
    };

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
        this.deleteDigit = this.deleteDigit.bind(this);
    };

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />

                <Button label="%" click={this.setOperation} operation />
                <Button label="AC" click={this.clearMemory} operation />
                <Button label="/" click={this.setOperation} operation />
                <Button label="DEL" click={this.deleteDigit} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        );
    };
};