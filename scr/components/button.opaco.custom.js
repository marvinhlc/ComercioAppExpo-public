import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class ButtonOpacoCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { text, onPress} = this.props;
    return (
		<TouchableOpacity 
            style={styles.buttonStyle}
			onPress={() => onPress()}>
			<Text style={styles.buttonTextStyle}>{text}</Text>
		</TouchableOpacity>
    );
  }
}

ButtonOpacoCustom.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
buttonStyle:{
  padding:10,
	backgroundColor: '#acacaf',
	borderRadius:5,
  marginTop:5
},
buttonTextStyle:{
  fontSize:20,
	color: '#fff',
	textAlign: 'center',
  fontFamily: 'Ubuntu-Light',
},
});