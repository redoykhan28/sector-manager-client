import React from 'react';

const Sectors = ({ sub }) => {
    console.log(sub)
    return (
        <>
            <option>&nbsp;&nbsp;{sub?.so1}</option>
            <option>&nbsp;&nbsp;{sub?.so2}</option>
            <option>&nbsp;&nbsp;{sub?.so3}</option>
            <option>&nbsp;&nbsp;{sub?.so4}</option>
            <option>&nbsp;&nbsp;{sub?.so5}</option>
            <option>&nbsp;&nbsp;{sub?.so6}</option>
            <option>&nbsp;&nbsp;{sub?.so7}</option>
        </>
    );
};

export default Sectors;