import React from 'react';
import First from './DiagramComponents/Diagrams/FirstDiagram';
import Second from './DiagramComponents/Diagrams/SecondDiagram';
import Third from './DiagramComponents/Diagrams/ThirdDaigram';
import Foot from  './DiagramComponents/Diagrams/Foot';
import './DiagramComponents/Diagrams/Diagrams.css';
function DiagramStudentsInfo() {
    return (
<div className="DiagramList">
        <First />
        <Second/>
        <Third/>
        <Foot/>
</div>
    )
}

export default DiagramStudentsInfo;
