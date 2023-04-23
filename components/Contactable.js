import React from 'react'
import { Text, View, Button} from "react-native";


const Contactable = (contactList, toPassDown) => {


    // let contactNodes = contactList.map((user) => {
    //     return <View>
    //     <Text> {user.name}</Text>
            
    //             </View>
    // })



    const handleGoBack= ()=>{
       
    }

  return (
   <View>
   {/* {contactNodes} */}
   <Text>Hello</Text>
    <Button onPress={handleGoBack} title="back to details"/>
   </View>
  )
}

export default Contactable;