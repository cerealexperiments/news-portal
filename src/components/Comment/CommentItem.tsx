import React, {useEffect, useState} from "react";
import {Comment, CommentReply} from "../../types";
import defaultProfile from "../../assets/defaultProfile.png";
import CommentReplyItem from "./CommentReplyItem";
import {replyToComment} from "../../helpers/data";
import {useMutation} from "react-query";
import {usePostData} from "../../helpers/usePostData";
import {motion} from "framer-motion";
import Spinner from "../Spinner";
import Button from "../Button";

type CommentItemProps = Comment & {
  postId: number;
};

const CommentItem: React.FC<CommentItemProps> = ({
  id,
  user,
  text,
  child,
  postId,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const postQuery = usePostData(postId);

  const replyMutation = useMutation({
    mutationFn: () => replyToComment(postId, replyText, id),
  });

  useEffect(() => {
    if (replyMutation.isSuccess) {
      postQuery.refetch();
    }
  }, [replyMutation.status]);

  return (
    <motion.div
      key={id}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
      }}>
      <div className="flex items-center">
        <img
          className="h-10 w-10 rounded-full mr-4"
          src={
            user.profile_image !== null
              ? `https://megalab.pythonanywhere.com/${user.profile_image}`
              : defaultProfile
          }
          alt=""
        />
        <div>
          <p className="font-medium text-xl">{`${user.name} ${user["last_name"]}`}</p>
          <p className="text-slate-500 ">{text}</p>
        </div>
      </div>
      <div className="pt-1.5 flex gap-8">
        <button
          onClick={() => setIsReplying((prev) => !prev)}
          className="text-violet-600 font-medium hover:underline hover:text-violet-700 transition-colors">
          Ответить
        </button>
      </div>
      {child?.map((reply: CommentReply) => (
        <CommentReplyItem
          key={reply.id}
          id={reply.id}
          user={reply.user}
          text={reply.text}
        />
      ))}
      {isReplying && (
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="pl-14 flex pt-4 gap-4 items-center">
          <p className="font-medium text-md">Вы</p>
          <input
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
            className="border-gray-300 rounded-xl border-2 px-4 py-1 max-w-md w-full focus:outline-none"
            type="text"
            placeholder="Напишите комментарий..."
          />
          {replyMutation.isLoading ? (
            <Spinner />
          ) : (
            <Button onClick={() => replyMutation.mutate()}>Ответить</Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CommentItem;
