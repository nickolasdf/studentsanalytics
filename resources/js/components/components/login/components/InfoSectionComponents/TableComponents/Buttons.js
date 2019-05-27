import React from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import {
  clickFirstButton, clickLastButton, changeButtons,
  changeMover,renderTable
} from '../../../../../redux/TableState/tableActions'
import {connect} from "react-redux";
import './Buttons.css'

const mapStateToProps = state => ({
  last: state.tableReducer.last,
  maxCount: state.tableReducer.maxCount,
  startCount: state.tableReducer.startCount,
  current: state.tableReducer.current
});

const mapDispatchToProps = dispatch => ({
  activateFirstButton: () => dispatch(clickFirstButton()),
  activateLastButton: () => dispatch(clickLastButton()),
  changeAllButtons: (i) => dispatch(changeButtons(i)),
  anotherMover: (i) => dispatch(changeMover(i)),
  updateTable:(flag)=>dispatch(renderTable(flag))
});


class Buttons extends React.Component {

  firstBtn = () => {                    //зброс на першу кнопку
    this.props.activateFirstButton();

  };

  lastBtn = () => {                      //перехід на останню
    this.props.activateLastButton();

  };

  changeBut = (i) => {                    //переписує номера кнопок
    this.props.changeAllButtons(i);

  };
  changeMover = (number) => {           //міняє показ рядів в списку по нажатію кнопочки
    this.props.anotherMover(number);
    this.props.updateTable(true);
  };

  render() {
    const {last, maxCount, startCount, current} = this.props;

    let buttons = [];//Будемо пушити кнопочки для листання списку

    //______________________________________________________________
    buttons.push(<Button id={current === 1 ? "buttonClick" : "buttons"} //Перша кнопка завжди є
                         onClick={() => {this.changeMover(0);this.firstBtn()}}>
      {1}
    </Button>);


    if (last <= maxCount && last !== 0 && last !== 1) {         //Якщо порядок останньої кнопочки меньший за
                                                                //кількість проміжних кнопочок
      for (let i = startCount; i <= last; i++)                  //то рендеримо стільки скільки маємо
        buttons.push(<Button id={current === i ? "buttonClick" : "buttons"}
                             onClick={() => {
                               this.changeMover(i - 1);
                               this.changeBut(i)}}>{i}
          </Button>);
    }

    if (last > maxCount) {      //Якшо кнопок більше чим в мене є

      if (startCount > 2) {//Коли починається рендер від 3 кпопки, то між першою і рядом проміжних лежить три крапки
        buttons.push(
          <Button id="Disabled" disabled>...</Button>)
      }

      for (let i = startCount; i <= maxCount; i++) {  //Рендерим проміжні кнопки
        buttons.push(<Button id={current === i ? "buttonClick" : "buttons"} onClick={() => {
          this.changeMover(i - 1);
          this.changeBut(i)}}>
          {i}
          </Button>);
      }

      if (maxCount + 1 < last) { //Єслі не дошли до кінця кнопок, то рендер трьох крапок
        buttons.push(<Button disabled id="Disabled">...</Button>)
      }
        //просто остання кнопка
      buttons.push(<Button id={current === last ? "buttonClick" : "buttons"} onClick={() => {
        this.changeMover(last - 1);
        this.lastBtn(); this.changeBut(last)}}>
        {last}</Button>)
    }
    return (
      <ButtonGroup className="ButtonsBlock">
        {buttons}
      </ButtonGroup>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);





