import React from 'react';
import { 
    Modal, 
    View, 
    TextInput, 
    StyleSheet, 
    KeyboardAvoidingView, 
    TouchableOpacity,
    Text,
    ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from "../constants/Colors";
import { postSupply, updateSupply, getSupply } from "../services/SuppliesService";

export default class SupplyModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name : "",
            condition: "",
            description: "",
        };

        this.conditionInpt = React.createRef();
        this.descriptionInput = React.createRef();
    }

    componentDidMount(){
        if(this.props.supplyId >= 0){
            console.log("tu jestem");
            getSupply(this.props.supplyId)
            .then((res) => this.setState({
                name: res.name,
                condition: res.state,
                description: res.description,
            }));
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.supplyId != prevProps.supplyId)
            if(this.props.supplyId >= 0){
                console.log("tu jestem");
                getSupply(this.props.supplyId)
                .then((res) => this.setState({
                    name: res.name,
                    condition: res.state,
                    description: res.description,
                }));
            }
    }

    submit = ()=>{
        if(this.state.supplyId < 0){
            const {name, condition: state, description} = this.state;
            postSupply({name, state, description})
            .then(() => this.props.onClose());
        }else{  
            const {name, condition: state, description} = this.state;
            updateSupply(this.props.supplyId, {name, state, description})
            .then(()=> this.props.onClose());
        }
        this.setState({name:"", condition: "", description: ""});
    }

    render(){
        return(
            
            <Modal
                visible={this.props.visible}
                animationType="fade"
                transparent= {true}
                onRequestClose={()=>{
                    this.props.onClose();
                    this.setState({name:"", condition: "", description: ""});
                }}
            >
                
                <KeyboardAvoidingView style={{flex:1}} enabled>
                {/* <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={()=>{
                    this.props.onClose();
                    this.setState({name:"", condition: "", description: ""});
                }}> */}
                <ScrollView 
                    style={{flex: 1}} 
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.container}>
                                        
                    <View style={styles.modalBody}>

                        <Text style={styles.title}>
                            {this.props.supplyId < 0 && "New supply"}
                            {this.props.supplyId >= 0 && "Edit supply"}
                        </Text>
                        

                        <TextInput
                            placeholder="Name"
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            onChangeText={(text)=>{
                                this.setState({name: text});
                            }}
                            value={this.state.name}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.conditionInpt.current.focus()}
                        />    

                        <TextInput
                            placeholder="Condition"
                            style={styles.input}
                            ref={this.conditionInpt}
                            underlineColorAndroid="transparent"
                            onChangeText={(text)=>{
                                this.setState({condition: text});
                            }}
                            value={this.state.condition}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.descriptionInput.current.focus()}
                        />

                        <TextInput
                            placeholder="Description"
                            style={styles.input}
                            ref={this.descriptionInput}
                            underlineColorAndroid="transparent"
                            onChangeText={(text)=>{
                                this.setState({description: text});
                            }}
                            value={this.state.description}
                            onSubmitEditing={this.submit}
                        />
                        <View style={{height: 20}} />

                        <View style={{
                            position: "absolute",
                            width: "100%",
                            bottom: -29,
                            alignItems: "center"
                        }}>
                            
                        <TouchableOpacity 
                            onPress={this.submit}
                            style={styles.button}>
                            <Icon type="material" name="done" color="#FFF"/>
                        </TouchableOpacity>
                        </View>

                    </View>
                    
                </ScrollView>
                {/* </TouchableOpacity> */}
                </KeyboardAvoidingView>
                <View style={styles.backgroundDim} />
            </Modal>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column-reverse",
        justifyContent: "center"
    },
    backgroundDim: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#000",
        opacity: 0.5,
        zIndex: -1,
    },
    modalBody: {
        marginHorizontal: 56,
        backgroundColor: "#FFF",
        borderRadius: 18,
        flexDirection: "column",
    },
    title: {
        color: Colors.accentColor,
        fontSize: 16,
        height: 42,
        fontFamily: "nunito-extralight",
        paddingLeft: 20,
        marginBottom: 12,
        marginTop: 13,
        borderBottomWidth: 1,
        borderBottomColor: Colors.accentColor,
    },
    input: {
        color: "black",
        fontSize: 14,
        fontFamily: "nunito-extralight",
        height: 42,
        width: 250,
        borderColor: "#FFF",
        borderWidth: 0,
        paddingLeft: 16,
        marginBottom: 12,
      },
    button: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.accentColor,
        alignItems: "center",
        justifyContent: "center"
    }
});

SupplyModal.defaultProps = {
    visible: true,
    supplyId: -1,
};