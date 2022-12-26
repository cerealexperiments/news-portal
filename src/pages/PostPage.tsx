import React from 'react';
import { IoArrowBackSharp, IoShareSocialOutline } from "react-icons/io5";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useQuery} from "react-query";
import {Comment, CommentReply} from "../types";
import defaultImage from "../assets/defaultImage.png"

export const fetchPostData = async (postId: number | undefined) => {
  const data = await axios.get(`https://megalab.pythonanywhere.com/post/${postId}/`, {
    headers: {
      Authorization: "Token 26c1cffd42f854414e7ccf2b3cbfb851ecb296ea"
    }
  })
  console.log(data.data);
  return data.data;
}

const PostPage: React.FC = () => {
  const { postId } = useParams();
  const query = useQuery("post", () => fetchPostData(Number(postId)));
  console.log(postId);

  return (
    <div className="max-w-screen-xl mx-auto pt-8 w-full pb-32">
      <div className="max-w-[845px]">
        <Link to={"/"}><IoArrowBackSharp size="30"/></Link>
        {query.isLoading && <p>Loading...</p>}
        {query.isSuccess && <>
        <p className="pt-6 text-2xl font-medium">{query.data.title}</p>
          <p className="pt-4 text-slate-500">{query.data.text.length > 200 ? query.data.text.slice(0, 200) : query.data.text}</p>
          <img className="pt-6 h-[500px] w-full object-cover object-center" src={query.data.image !== "https://megalab.pythonanywhere.com/null" || query.data.image === null ? `https://megalab.pythonanywhere.com/${query.data.image}` : defaultImage} alt=""/>
          <p className="pt-4 pb-6 text-slate-500">{query.data.text.length > 200 ? query.data.text.slice(200, query.data.text.length) : null}</p>
          <IoShareSocialOutline size="24" color="#64748b"/>
          <div className="pt-12">
          <p className="text-2xl font-medium pb-8">Комментарии</p>
        {query.data.comment?.map((comment: Comment)  => {
          return <div className="">
            <p className="font-medium text-xl">{`${comment.user.name} ${comment.user["last_name"]}`}</p>
            <p className="text-slate-500 pt-1.5">{comment.text}</p>
            <div className="pt-1.5 flex gap-8">
            <p className="underline text-violet-600">Ответить</p>
          </div>
        {comment.child?.map((reply: CommentReply) => {
          return <div className="pl-14 pt-6">
          <p className="font-medium text-xl">{`${reply.user.name} ${reply.user["last_name"]}`}</p>
          <p className="text-slate-500 pt-1.5">{reply.text}</p>
          <div className="pt-1.5 flex gap-8">
          <p className="underline text-violet-600">Ответить</p>
          </div>
          </div>
        })}
          </div>
        })}
          </div></>}
        <div className="flex pt-8 gap-8">
          <input className="border-gray-300 rounded-xl border-2 px-4 py-2 max-w-md w-full" type="text" placeholder="Напишите комментарий..."/>
          <button className="bg-violet-700 py-2 px-8 rounded-xl text-white font-medium">Ответить</button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
