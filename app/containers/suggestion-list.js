import React,{Component} from 'react';
import{FlatList,Text} from 'react-native';
import Layout from '../components/suggestion-list-layout';
import Empty from '../components/empty';
import Separator from '../components/separator';
import Suggestion from '../components/suggestion';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
function mapStateToProps(state){
    return {
        list: state.videos.contenido,
    }
}
class SuggestionList extends Component {
    renderEmpty=()=><Empty text="No hay sugerencias"></Empty>
    itemSeparatos=()=><Separator text="No hay sugerencias"></Separator>
    viewContenido=(item)=>{
        this.props.dispatch({
            type:'SET_SELECTED_CONTENT',
            payload:{
                contenido: item,
            }
        })
        this.props.dispatch(NavigationActions.navigate({
            routeName: 'Contenido'
        }))
    }
    renderItem=({item})=>{
        return(
            <Suggestion {...item}
            onPress={()=>{this.viewContenido(item)}}
            />
        )
    }
    keyExtractor = item=>item.id_CREA.toString()
    render(){
        return(
            <Layout title="Recomendado">
            <FlatList
                keyExtractor={this.keyExtractor}
                data={this.props.list}
                ListEmptyComponent= {this.renderEmpty}
                ItemSeparatorComponent={this.itemSeparatos}
                renderItem={this.renderItem}
            />
            </Layout>
        );
    }
}
export default connect(mapStateToProps) (SuggestionList);