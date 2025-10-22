import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface QuizResult {
  id: number;
  name: string;
  courseName: string;
  questions: number;
  time: string;
  mark: number;
  totalMarks: number;
  grade: string;
  createdAt: string;
}

const quizResults: QuizResult[] = [
  {
    id: 1,
    name: "Digital Marketing Fundamentals Quiz",
    courseName: "Complete Digital Marketing Masterclass",
    questions: 20,
    time: "22 minutes",
    mark: 85,
    totalMarks: 100,
    grade: "A",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "SEO Basics Assessment",
    courseName: "Complete Digital Marketing Masterclass",
    questions: 15,
    time: "18 minutes",
    mark: 78,
    totalMarks: 100,
    grade: "B+",
    createdAt: "2024-01-08",
  },
  {
    id: 3,
    name: "ICD-10 Coding Quiz",
    courseName: "Medical Coding Certification Prep",
    questions: 20,
    time: "35 minutes",
    mark: 65,
    totalMarks: 100,
    grade: "C",
    createdAt: "2024-01-05",
  },
  {
    id: 4,
    name: "Social Media Marketing Quiz",
    courseName: "Complete Digital Marketing Masterclass",
    questions: 18,
    time: "25 minutes",
    mark: 92,
    totalMarks: 100,
    grade: "A+",
    createdAt: "2024-01-03",
  },
  {
    id: 5,
    name: "CPT Coding Assessment",
    courseName: "Medical Coding Certification Prep",
    questions: 25,
    time: "40 minutes",
    mark: 88,
    totalMarks: 100,
    grade: "A",
    createdAt: "2023-12-28",
  },
];

export default function Quizzes() {
  const getGradeBadge = (grade: string) => {
    if (grade.startsWith('A')) {
      return <Badge className="bg-green-500 hover:bg-green-600">{grade}</Badge>;
    } else if (grade.startsWith('B')) {
      return <Badge className="bg-blue-500 hover:bg-blue-600">{grade}</Badge>;
    } else if (grade.startsWith('C')) {
      return <Badge className="bg-orange-500 hover:bg-orange-600">{grade}</Badge>;
    } else {
      return <Badge variant="destructive">{grade}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Quiz Results" }
      ]} />
      
      <div>
        <h1 className="text-3xl font-bold">Quiz Result Lists</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          {quizResults.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">SI</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead className="w-28">Questions</TableHead>
                  <TableHead className="w-32">Time</TableHead>
                  <TableHead className="w-24">Mark</TableHead>
                  <TableHead className="w-24">Grade</TableHead>
                  <TableHead className="w-32">Created At</TableHead>
                  <TableHead className="w-32 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quizResults.map((quiz, index) => (
                  <TableRow key={quiz.id} data-testid={`row-quiz-${quiz.id}`}>
                    <TableCell className="font-medium" data-testid={`cell-sl-${quiz.id}`}>
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium" data-testid={`cell-name-${quiz.id}`}>
                      {quiz.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground" data-testid={`cell-course-${quiz.id}`}>
                      {quiz.courseName}
                    </TableCell>
                    <TableCell data-testid={`cell-questions-${quiz.id}`}>
                      {quiz.questions}
                    </TableCell>
                    <TableCell data-testid={`cell-time-${quiz.id}`}>
                      {quiz.time}
                    </TableCell>
                    <TableCell data-testid={`cell-mark-${quiz.id}`}>
                      <span className="font-semibold">{quiz.mark}</span>
                      <span className="text-muted-foreground">/{quiz.totalMarks}</span>
                    </TableCell>
                    <TableCell data-testid={`cell-grade-${quiz.id}`}>
                      {getGradeBadge(quiz.grade)}
                    </TableCell>
                    <TableCell className="text-muted-foreground" data-testid={`cell-created-${quiz.id}`}>
                      {new Date(quiz.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right" data-testid={`cell-action-${quiz.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        data-testid={`button-view-quiz-${quiz.id}`}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No data
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
