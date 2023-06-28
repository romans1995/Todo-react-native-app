import React from 'react';
import { CheckBox } from 'react-native-elements';

const CheckboxComponent = ({isChecked,onChecked, ...props}) => {
    
    return (
        <>
          <CheckBox
            center
            checked={isChecked}
            onPress={()=> onChecked(!isChecked)}
          />
          </>
  );
};
export default CheckboxComponent;