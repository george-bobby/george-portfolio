import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "AI-Powered Healthcare Platform",
    description: "A revolutionary healthcare platform leveraging AI for early disease detection and personalized treatment.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    tools: ["React", "TensorFlow", "Python", "AWS"],
    slug: "ai-healthcare"
  },
  {
    id: 2,
    title: "Smart Home Automation System",
    description: "An IoT-based home automation system providing intelligent control over household devices with advanced energy management.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    tools: ["React Native", "Node.js", "MongoDB", "IoT"],
    slug: "smart-home"
  },
  {
    id: 3,
    title: "E-Learning Platform",
    description: "A comprehensive e-learning platform featuring interactive courses, real-time collaboration, and AI-powered personalized learning paths.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    tools: ["Next.js", "TypeScript", "PostgreSQL", "WebRTC"],
    slug: "e-learning"
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    const totalPanels = projects.length;
    const panelWidth = window.innerWidth;

    container.style.width = `${totalPanels * 100}%`;

    // Horizontal Scroll Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: `+=${panelWidth * (totalPanels - 1)}`,
        scrub: 1,
        onUpdate: (self) => {
          // Hide "Scroll for More" after scrolling starts
          // setShowScrollIndicator(self.progress < 0.1);
        }
      }
    });

    tl.to(container, {
      x: `-${(totalPanels - 1) * panelWidth}px`,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden bg-gradient-to-br from-background via-background/90 to-background"
      >
        <div ref={containerRef} className="flex h-full absolute top-0 left-0">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`w-screen h-full flex items-center justify-center project-${index}`}
            >
              <div className="w-[90vw] h-[80vh] relative bg-secondary/10 rounded-2xl overflow-hidden backdrop-blur-md hover:bg-secondary/20 transition-all duration-500 group">
                <div className="absolute inset-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-all duration-500 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background/90" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                      {project.title}
                    </h3>
                    <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-4 py-2 text-sm bg-primary/20 text-primary rounded-full backdrop-blur-sm"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <Button
                      onClick={() => navigate(`/project/${project.slug}`)}
                      size="lg"
                      className="group/btn bg-primary/20 hover:bg-primary backdrop-blur-sm"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Down Indicator - Only Visible Initially */}
        {/* {showScrollIndicator && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-center animate-bounce">
            <ChevronDown className="w-8 h-8 text-primary/50" />
            <div className="text-sm text-primary/50 mt-2">Scroll for more</div>
          </div>
        )} */}
      </section>

      {/* View All Projects Section */}
      {/* <section className="h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/90">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Discover More Projects
          </h2>
          <Button
            onClick={() => navigate('/projects')}
            size="lg"
            className="group bg-primary/20 hover:bg-primary backdrop-blur-sm"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section> */}
    </>
  );
};

export default Projects;
