import { Card, CardContent } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Download, Share2, Calendar } from "lucide-react";
import certificatePreview from "@assets/generated_images/Professional_certificate_design_with_logo_8e53e36b.png";
import elmondLogo from "@assets/logo_1761063658577.png";

export default function Certificates() {
  const certificates = [
    {
      id: 1,
      courseTitle: "Meta Ads Mastery",
      certificateNumber: "CERT-2025-001",
      issuedDate: "Jan 18, 2025",
      category: "Digital Marketing",
    },
    {
      id: 2,
      courseTitle: "Ad Copy Mastery",
      certificateNumber: "CERT-2024-042",
      issuedDate: "Dec 20, 2024",
      category: "Digital Marketing",
    },
    {
      id: 3,
      courseTitle: "Digital Marketing Mastery",
      certificateNumber: "CERT-2024-038",
      issuedDate: "Dec 28, 2024",
      category: "Digital Marketing",
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "My Certificates" }
        ]} />
        
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">My Certificates</h1>
          <p className="text-muted-foreground">Your earned certificates and achievements</p>
        </div>

        {certificates.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-xl mb-2">No certificates yet</h3>
              <p className="text-muted-foreground mb-6">
                Complete courses to earn certificates
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="overflow-hidden" data-testid={`card-certificate-${cert.id}`}>
                <div className="relative aspect-[4/3] bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950/20 dark:to-blue-950/20">
                  <img 
                    src={certificatePreview}
                    alt="Certificate Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <img src={elmondLogo} alt="Elmond" className="h-6" />
                      <Badge variant="secondary" className="text-xs">{cert.category}</Badge>
                    </div>
                    <h3 className="font-display font-bold text-lg" data-testid={`text-certificate-title-${cert.id}`}>
                      Certificate of Completion
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3">{cert.courseTitle}</h4>
                  
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Certificate ID:</span>
                      <span className="font-mono" data-testid={`text-certificate-number-${cert.id}`}>
                        {cert.certificateNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Issued: {cert.issuedDate}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm" data-testid={`button-download-${cert.id}`}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" data-testid={`button-share-${cert.id}`}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
