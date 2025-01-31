import { PropsWithChildren } from 'react';
// interface CourseGoalProps {
//     title: string;
//     children?: ReactNode;
// }

// type CourseGoalProps = PropsWithChildren<{ title: string }>;
// const CourseGoal: FC<CourseGoalProps> = ({ title, children }: CourseGoalProps) => {
//     return (
//         <article>
//             <div>
//                 <h2>{title}</h2>
//                 {children}
//             </div>
//             <button>Delete</button>
//         </article>
//     );
// }

// export default CourseGoal;

type CourseGoalProps = PropsWithChildren<{
    id: number;
    title: string;
    onDelete: (id: number) => void;
  }>;
  
  export default function CourseGoal({
    title,
    id,
    children,
    onDelete,
  }: CourseGoalProps) {
    return (
      <article>
        <div>
          <h2>{title}</h2>
          {children}
        </div>
        <button onClick={() => onDelete(id)}>Delete</button>
      </article>
    );
  }