import React,{Component} from 'react';
import{FlatList,Text,View, StyleSheet} from 'react-native';
import Layout from '../../components/suggestion-list-layout';
import Empty from '../../components/empty';
import Separator from '../../components/separator';
import Suggestion from '../components/doubtComponents';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

function mapStateToProps(state){
    return {
        list: state.videos.subject,
        duda: state.videos.duda,
        ipconfig: state.videos.selectedIPConfig
    }
}
class SuggestionList extends Component {
    renderEmpty=()=><Empty text="No hay materias asociadas al colegio"></Empty>
    itemSeparatos=()=><Separator text="No hay materias asociadas al colegio"></Separator>
    viewContenido=(item)=>{
        
        //console.log(this.props.dispatch)
    }
    renderItem=({item})=>{
        return(
            <Suggestion {...item}
            onPress={()=>{this.viewContenido(item)}}
            />
        )
    }
    keyExtractor = item=>item.id_duda.toString()
    render(){
        var data = [];
        //console.log("Esto es para el filtro");
        data = this.props.duda;
        console.log("Cargando Datos");
        console.log(data);
        return(
            <Layout title="Tus Dudas">
            <FlatList
                keyExtractor={this.keyExtractor}
                data={data}
                ListEmptyComponent= {this.renderEmpty}
                ItemSeparatorComponent={this.itemSeparatos}
                renderItem={this.renderItem}
            />
            </Layout>
        );
    }
}
export default connect(mapStateToProps) (SuggestionList);