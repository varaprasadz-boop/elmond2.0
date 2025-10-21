import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, XCircle, AlertCircle, Trophy } from "lucide-react";

const quizzes = [
  {
    id: 1,
    title: "Digital Marketing Fundamentals Quiz",
    course: "Complete Digital Marketing Masterclass",
    questions: 20,
    duration: "30 minutes",
    passingScore: 70,
    attempts: 2,
    maxAttempts: 3,
    status: "available",
    dueDate: "2024-02-15",
  },
  {
    id: 2,
    title: "Medical Coding Module 1 Assessment",
    course: "Medical Coding Certification Prep",
    questions: 25,
    duration: "45 minutes",
    passingScore: 80,
    attempts: 0,
    maxAttempts: 2,
    status: "available",
    dueDate: "2024-02-20",
  },
];

const completedQuizzes = [
  {
    id: 3,
    title: "SEO Basics Quiz",
    course: "Complete Digital Marketing Masterclass",
    score: 85,
    passingScore: 70,
    questions: 15,
    completedDate: "2024-01-10",
    status: "passed",
    timeSpent: "22 minutes",
  },
  {
    id: 4,
    title: "ICD-10 Coding Quiz",
    course: "Medical Coding Certification Prep",
    score: 65,
    passingScore: 80,
    questions: 20,
    completedDate: "2024-01-08",
    status: "failed",
    timeSpent: "35 minutes",
  },
  {
    id: 5,
    title: "Social Media Marketing Quiz",
    course: "Complete Digital Marketing Masterclass",
    score: 92,
    passingScore: 70,
    questions: 18,
    completedDate: "2024-01-05",
    status: "passed",
    timeSpent: "25 minutes",
  },
];

export default function Quizzes() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passed":
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Passed
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">Quizzes</h1>
          <p className="text-muted-foreground">Take quizzes and track your progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{quizzes.length + completedQuizzes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{completedQuizzes.filter(q => q.status === "passed").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(completedQuizzes.reduce((acc, q) => acc + q.score, 0) / completedQuizzes.length)}%
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="available">
        <TabsList>
          <TabsTrigger value="available" data-testid="tab-available">
            Available ({quizzes.length})
          </TabsTrigger>
          <TabsTrigger value="completed" data-testid="tab-completed">
            Completed ({completedQuizzes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4 mt-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} data-testid={`card-quiz-${quiz.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription>{quiz.course}</CardDescription>
                  </div>
                  <Badge variant="secondary">Due: {new Date(quiz.dueDate).toLocaleDateString()}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Questions:</span>
                    <div className="font-semibold">{quiz.questions}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <div className="font-semibold">{quiz.duration}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Passing Score:</span>
                    <div className="font-semibold">{quiz.passingScore}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Attempts:</span>
                    <div className="font-semibold">{quiz.attempts}/{quiz.maxAttempts}</div>
                  </div>
                </div>
                {quiz.attempts > 0 && (
                  <div className="mt-4 p-3 bg-muted rounded-md flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">You have {quiz.maxAttempts - quiz.attempts} attempt(s) remaining</span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  disabled={quiz.attempts >= quiz.maxAttempts}
                  data-testid={`button-start-quiz-${quiz.id}`}
                >
                  {quiz.attempts === 0 ? "Start Quiz" : "Retake Quiz"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {completedQuizzes.map((quiz) => (
            <Card key={quiz.id} data-testid={`card-completed-quiz-${quiz.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription>{quiz.course}</CardDescription>
                  </div>
                  {getStatusBadge(quiz.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Score:</span>
                      <div className="font-bold text-lg">{quiz.score}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Passing:</span>
                      <div className="font-semibold">{quiz.passingScore}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Time Spent:</span>
                      <div className="font-semibold">{quiz.timeSpent}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Completed:</span>
                      <div className="font-semibold">{new Date(quiz.completedDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Score Progress</span>
                      <span className="font-semibold">{quiz.score}/{quiz.passingScore}%</span>
                    </div>
                    <Progress value={(quiz.score / quiz.passingScore) * 100} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" data-testid={`button-view-results-${quiz.id}`}>
                  View Results
                </Button>
                {quiz.status === "failed" && (
                  <Button data-testid={`button-retake-${quiz.id}`}>
                    Retake Quiz
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
