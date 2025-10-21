import { useRoute, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lock,
  PlayCircle,
  FileText,
  Download,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { getCourseBySlug } from "@/data/mockData";

export default function Learn() {
  const [, params] = useRoute("/learn/:slug");
  const courseSlug = params?.slug;
  const foundCourse = getCourseBySlug(courseSlug || "");
  const [currentLesson, setCurrentLesson] = useState(0);
  
  if (!foundCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-4">The learning content you're looking for doesn't exist.</p>
          <Link href="/my-courses">
            <Button>View My Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const course = {
    id: foundCourse.id,
    slug: foundCourse.slug,
    title: foundCourse.title,
    category: foundCourse.category,
    progress: 75,
    modules: [
      {
        title: "Introduction to Digital Marketing",
        lessons: [
          { id: 1, title: "What is Digital Marketing?", duration: "15:30", type: "video", completed: true, isFree: true },
          { id: 2, title: "Digital Marketing Channels Overview", duration: "20:45", type: "video", completed: true, isFree: true },
          { id: 3, title: "Quiz: Introduction", duration: "10:00", type: "quiz", completed: true, isFree: false },
        ]
      },
      {
        title: "Search Engine Optimization (SEO)",
        lessons: [
          { id: 4, title: "SEO Fundamentals", duration: "25:15", type: "video", completed: true, isFree: false },
          { id: 5, title: "Keyword Research Basics", duration: "30:20", type: "video", completed: true, isFree: false },
          { id: 6, title: "On-Page SEO Techniques", duration: "28:40", type: "video", completed: true, isFree: false },
          { id: 7, title: "Assignment: SEO Audit", duration: "45:00", type: "assignment", completed: false, isFree: false },
        ]
      },
      {
        title: "Social Media Marketing",
        lessons: [
          { id: 8, title: "Social Media Platforms Overview", duration: "18:30", type: "video", completed: true, isFree: false },
          { id: 9, title: "Content Planning & Strategy", duration: "22:15", type: "video", completed: false, isFree: false },
          { id: 10, title: "Creating Engaging Posts", duration: "20:00", type: "video", completed: false, isFree: false },
        ]
      },
      {
        title: "Email Marketing",
        lessons: [
          { id: 11, title: "Email Marketing Basics", duration: "16:45", type: "video", completed: false, isFree: false },
          { id: 12, title: "Building Email Lists", duration: "19:30", type: "video", completed: false, isFree: false },
          { id: 13, title: "Email Campaign Design", duration: "24:20", type: "video", completed: false, isFree: false },
          { id: 14, title: "Quiz: Email Marketing", duration: "15:00", type: "quiz", completed: false, isFree: false },
        ]
      },
    ]
  };

  const allLessons = course.modules.flatMap(m => m.lessons);
  const currentLessonData = allLessons[currentLesson];
  const completedLessons = allLessons.filter(l => l.completed).length;
  const totalLessons = allLessons.length;

  const handleNextLesson = () => {
    if (currentLesson < allLessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="font-display font-bold text-xl truncate" data-testid="text-learn-course-title">
                {course.title}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex-1 max-w-md">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Course Progress</span>
                    <span className="font-semibold" data-testid="text-learn-progress">
                      {completedLessons}/{totalLessons} lessons
                    </span>
                  </div>
                  <Progress value={(completedLessons / totalLessons) * 100} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-black flex items-center justify-center">
          {currentLessonData.type === "video" ? (
            <div className="w-full max-w-5xl p-4">
              <div className="bg-background/5 rounded-lg p-4 mb-4">
                <h2 className="text-white text-xl font-bold mb-2" data-testid="text-current-lesson-title">
                  {currentLessonData.title}
                </h2>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Video Lesson</Badge>
                  <span className="text-white/70 text-sm">Duration: {currentLessonData.duration}</span>
                  {currentLessonData.completed && (
                    <Badge className="bg-green-600">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Protected Video Player - No Download Options */}
              <div 
                className="relative w-full aspect-video bg-black rounded-lg overflow-hidden"
                onContextMenu={(e) => e.preventDefault()}
              >
                <video
                  controls
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full"
                  data-testid="video-player"
                  poster="/api/placeholder/1280/720"
                >
                  {/* In production, this would be a streaming URL from your video hosting service */}
                  <source src="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Watermark overlay (optional) */}
                <div className="absolute top-4 right-4 text-white/30 text-xs pointer-events-none select-none">
                  Elmond LMS - Protected Content
                </div>
              </div>
              
              <div className="mt-4 text-white/50 text-xs text-center">
                ⚠️ This content is protected. Download and screen recording are prohibited.
              </div>
            </div>
          ) : currentLessonData.type === "quiz" ? (
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                <FileText className="h-16 w-16 text-white" />
              </div>
              <h2 className="text-white text-2xl font-bold mb-2" data-testid="text-current-lesson-title">
                {currentLessonData.title}
              </h2>
              <Badge variant="secondary" className="mb-4">Quiz</Badge>
              <p className="text-white/70 mb-6">Duration: {currentLessonData.duration}</p>
              {currentLessonData.completed && (
                <Badge className="bg-green-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                <FileText className="h-16 w-16 text-white" />
              </div>
              <h2 className="text-white text-2xl font-bold mb-2" data-testid="text-current-lesson-title">
                {currentLessonData.title}
              </h2>
              <Badge variant="secondary" className="mb-4">Assignment</Badge>
              <p className="text-white/70 mb-6">Duration: {currentLessonData.duration}</p>
              {currentLessonData.completed && (
                <Badge className="bg-green-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="border-t p-4 bg-background">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <Button 
              variant="outline" 
              onClick={handlePrevLesson}
              disabled={currentLesson === 0}
              data-testid="button-prev-lesson"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex-1 text-center">
              <p className="text-sm text-muted-foreground">
                Lesson {currentLesson + 1} of {totalLessons}
              </p>
            </div>

            <Button 
              onClick={handleNextLesson}
              disabled={currentLesson === allLessons.length - 1}
              data-testid="button-next-lesson"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-96 border-l overflow-auto bg-background">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-lg">Course Content</h3>
        </div>

        <Accordion type="single" collapsible defaultValue="module-0" className="px-4">
          {course.modules.map((module, moduleIdx) => (
            <AccordionItem key={moduleIdx} value={`module-${moduleIdx}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2 text-left">
                  <span className="font-semibold">{module.title}</span>
                  <Badge variant="secondary" className="text-xs">
                    {module.lessons.filter(l => l.completed).length}/{module.lessons.length}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {module.lessons.map((lesson, lessonIdx) => {
                    const globalIdx = allLessons.findIndex(l => l.id === lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLesson(globalIdx)}
                        className={`w-full text-left p-3 rounded-md hover-elevate flex items-start gap-3 ${
                          globalIdx === currentLesson ? 'bg-primary/10' : ''
                        }`}
                        data-testid={`button-lesson-${lesson.id}`}
                      >
                        <Checkbox checked={lesson.completed} className="mt-1" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium truncate">{lesson.title}</p>
                            {!lesson.isFree && <Lock className="h-3 w-3 text-muted-foreground" />}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {lesson.type === "video" && <PlayCircle className="h-3 w-3" />}
                            {lesson.type === "quiz" && <FileText className="h-3 w-3" />}
                            {lesson.type === "assignment" && <Download className="h-3 w-3" />}
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                        {lesson.completed && (
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="p-4 border-t mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Need Help?</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Have questions about this course? Ask in the discussion forum.
              </p>
              <Button variant="outline" className="w-full" size="sm">
                Go to Discussions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
