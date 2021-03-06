<?php

namespace Thesis\BulletinBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\OneToOne;
use JMS\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\ExecutionContextInterface;

/**
 * ImageAnnouncement
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="ImageAnnouncementRepository")
 */
class ImageAnnouncement extends Announcement {

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     * @Groups({"search"})
     */
    private $description;

    /**
     * @OneToOne(targetEntity="Document")
     * @JoinColumn(name="document_id", referencedColumnName="id")
     */
    private $document;

    /**
     * Set description
     *
     * @param string $description
     *
     * @return ImageAnnouncement
     */
    public function setDescription($description) {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription() {
        return $this->description;
    }

    /**
     * @Assert\Callback
     */
    public function validate(ExecutionContextInterface $context) {
        if ($this->title === null) {
            $context->addViolation("Please fill in all required(*) fields");
        }

        if ($this->title === null) {
            $context->addViolationAt('title', null);
        }
    }

    /**
     * Set document
     *
     * @param Document $document
     *
     * @return ImageAnnouncement
     */
    public function setDocument(Document $document = null) {
        $this->document = $document;

        return $this;
    }

    /**
     * Get document
     *
     * @return Document
     */
    public function getDocument() {
        return $this->document;
    }

    /**
     * Set pinned
     *
     * @param boolean $pinned
     *
     * @return ImageAnnouncement
     */
    public function setPinned($pinned) {
        $this->pinned = $pinned;

        return $this;
    }

    /**
     * Get pinned
     *
     * @return boolean
     */
    public function getPinned() {
        return $this->pinned;
    }

    /**
     * Set pinnedContent
     *
     * @param string $pinnedContent
     *
     * @return ImageAnnouncement
     */
    public function setPinnedContent($pinnedContent) {
        $this->pinnedContent = $pinnedContent;

        return $this;
    }

    /**
     * Get pinnedContent
     *
     * @return string
     */
    public function getPinnedContent() {
        return $this->pinnedContent;
    }

}
