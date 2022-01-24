import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import LeftNav from '../components/LeftNav';
import { isEmpty } from "../components/Utils";
import Card from "../components/Post/Card";
import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";

const Trending = () => {
        const uid = useContext(UidContext);
        const trendList = useSelector((state) => state.trendingReducer);

        return (<div className = "trending-page" >)
         
                export default Trending;