import React, { createContext, useContext, useState } from "react";



interface MediaContextType {

  videoUri: string | null;

  setVideoUri: (uri: string | null) => void;

}



const MediaContext = createContext<MediaContextType | null>(null);



export function MediaProvider({ children }) {

  const [videoUri, setVideoUri] = useState(null);



  return (

    <MediaContext.Provider value={{ videoUri, setVideoUri }}>

      {children}

    </MediaContext.Provider>

  );

}



export const useMedia = () => {

  const context = useContext(MediaContext);

  if (!context) {

    throw new Error("useMedia must be used within a MediaProvider");

  }

  return context;

};

